import Gun from "gun";
import "gun/sea";

const gun = Gun({
  peers: ["https://shindigit-server.fly.dev/"],
  localStorage: true,
  radisk: true,
  // file: "",
});
export { gun };
