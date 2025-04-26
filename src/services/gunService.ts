import Gun from "gun";
import "gun/sea";
const gun = Gun({
  peers: ["https://gun-manhattan.herokuapp.com/gun"],
  localStorage: false,
});
export { gun };
