import {createTransform} from "redux-persist";
import Interface from "../data/Interface";
import INTERFACES from "../enum/Interfaces";

// Will be called before the state is serialized to string, i.e.
// state is Immutable
function serialize(state, key) {
  switch (key) {
    case "output":
      // Store id only
      let interf = state.get("interface");
      return state.set("interface", new Interface({
        id      : interf.get("id"),
        parentId: interf.get("parentId"),
        property: interf.get("property"),
      }));
    default:
      return state;
  }
}

// Will be called after the state is deserialized to Immutable, i.e.
// state is Immutable
function deserialize(state, key) {
  switch (key) {
    case "output":
      let id = state.get("interface").get("id");

      return state.set("interface", INTERFACES[id]);
    default:
      return state;
  }
}

export const transforms = createTransform(serialize, deserialize, {});

export default {
  transforms,
};