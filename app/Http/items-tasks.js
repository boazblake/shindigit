export const addItemTask = (http) => (mdl) => (item) =>
  http.backEnd.postTask(mdl)("classes/Items")(item)

export const getItemsByEventIdTask = (http) => (mdl) => (eventId) =>
  http.backEnd.getTask(mdl)(
    `classes/Items?pageSize=100&where=eventId%3D'${eventId}'&sortBy=name%20asc`
  )

export const getItemsByGuestIdTask = (http) => (mdl) => (guestId) =>
  http.backEnd.getTask(mdl)(
    `classes/Items?pageSize=100&where=guestId%3D'${guestId}'&sortBy=name%20asc`
  )

export const deleteBulkItemsTask = (http) => (mdl) => (guestId) =>
  http.backEnd.deleteTask(mdl)(`classes/Items?where=guestId%3D'${guestId}'`)

export const deleteItemTask = (http) => (mdl) => (itemId) =>
  http.backEnd.deleteTask(mdl)(`classes/Items/${itemId}`)

export const updateItemTask = (http) => (mdl) => (item) =>
  http.backEnd.putTask(mdl)(`classes/Items/${item.objectId}`)(item)
