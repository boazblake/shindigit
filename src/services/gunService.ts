import Gun from "gun";
import "gun/sea";

const gun = Gun({
  peers: ["wss://shindigit-server.fly.dev/gun"],
  localStorage: true,
  radisk: true,
  // file: "",
});
export { gun };
