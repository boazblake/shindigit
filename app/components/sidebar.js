import { log, jsonCopy } from "Utils"
import { HTTP, getItemsByUserIdTask } from "Http"
import { Profile, AttendanceResponse } from "Components"
import { reduceBy, fromPairs } from "ramda"

export const Sidebar = () => {
  const state = {
    load: {
      error: Stream(null),
      isShowing: Stream(false),
      status: Stream("loading"),
    },
    Home: {
      isShowing: Stream(true),
      status: Stream("loading"),
      data: {
        items: [],
        invites: Stream([]),
      },
    },
    Profile: {
      isShowing: Stream(false),
      is24Hrs: Stream(false),
    },
  }

  const toItemViewModel = (items) =>
    Object.entries(
      reduceBy(
        (acc, { quantity }) => acc + quantity,
        0,
        ({ name }) => name.toLowerCase(),
        items
      )
    )
  // ).map(([name, quantity]) => ({ [name]: quantity }))

  const showState = (field) => {
    let keys = Object.keys(state)
    return keys.map((k) =>
      k == field ? state[k].isShowing(true) : state[k].isShowing(false)
    )
  }

  const load = ({ attrs: { mdl } }) => {
    const onError = (error) => {
      state.load.error(jsonCopy(error))
      state.load.status = "failed"
      console.log("error", error)
    }

    const onSuccess = (items) => {
      state.load.error(null)
      state.load.status("success")
      state.Home.data.items = toItemViewModel(items)
      state.Home.data.invites(mdl.State.notifications())
      console.log("wtf", state.Home.data.invites())
    }

    getItemsByUserIdTask(HTTP)(mdl)(mdl.User.objectId).fork(onError, onSuccess)
  }

  return {
    oninit: load,
    // oncreate: (v) => console.log("oncreate", v),
    view: ({ attrs: { mdl } }) => {
      return m(".sidebar-page", [
        m(
          ".sidebar-tab-section",
          m(".frow row ", [
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Home.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState(e.target.innerHTML),
              },
              "Home"
            ),
            m(
              "button.sidebar-tab.col-xs-1-3",
              {
                class: state.Profile.isShowing() ? "sidebar-tab-selected" : "",
                onclick: (e) => showState(e.target.innerHTML),
              },
              "Profile"
            ),

            m(
              ".required-field",
              m(
                m.route.Link,
                {
                  href: `/logout`,
                  selector: "button.sidebar-tab",
                  class: "col-xs-1-3",
                },
                "Logout"
              )
            ),
          ])
        ),

        state.Home.isShowing() &&
          m(".sidebar-section", [
            m(".frow column-center", [
              m(".sidebar-article", [
                m("p.sidebar-section-heading", "Items"),
                m(
                  ".ul",
                  state.Home.data.items.map(([name, quantity]) =>
                    m("li.sidebar-items-list", name + " : " + quantity)
                  )
                ),
              ]),
              m(".sidebar-article", [
                m("p.sidebar-section-heading", "Invites"),
                mdl.State.notifications().invites.map((invite, idx) =>
                  m(
                    ".sidebar-invites",
                    m(".frow mb-10", [
                      m(".col-xs-1-2 text-ellipsis", `${invite.title}`),
                      m(
                        ".col-xs-1-2",
                        `On: ${invite.start.format("MM-DD-YYYY")}`
                      ),
                      m(".col-xs-1-2", `From: ${invite.start.format("HH:mm")}`),
                      m(".col-xs-1-2", `To: ${invite.end.format("HH:mm")}`),
                    ]),
                    m(AttendanceResponse, {
                      mdl,
                      updateFn: (x) => {
                        mdl.State.notifications().invites.removeAt(idx)
                        console.log("remove x from ...", x)
                      },
                      guest: invite,
                    })
                  )
                ),
              ]),
            ]),
          ]),
        state.Profile.isShowing() &&
          m(
            ".sidebar-section",
            m(".frow column-center", [
              m(".sidebar-article", m(Profile, { mdl })),
            ])
          ),
      ])
    },
  }
}
