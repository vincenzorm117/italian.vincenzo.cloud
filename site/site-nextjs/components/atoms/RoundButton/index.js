import { IconEdit, IconTrashBin, IconSave, IconX } from "../Icons";
import styles from "./styles.module.scss";
import cn from "classnames";

export default function RoundButton({
  type = "",
  children,
  onClick = null,
  className = "",
}) {
  const params = {};

  if (typeof onClick === "function") {
    params.onClick = onClick;
  }

  const types = {
    edit: {
      component: IconEdit,
      styles: styles.edit,
    },
    removeRed: {
      component: IconTrashBin,
      styles: styles.removeRed,
    },
    save: {
      component: IconSave,
      styles: styles.save,
    },
    cancel: {
      component: IconX,
      styles: styles.cancel,
    },
  };

  if (types.hasOwnProperty(type)) {
    const t = types[type];
    return (
      <div className={cn(className, t.styles)} {...params}>
        <t.component />
      </div>
    );
  }

  throw new Error("Must specifiy valid type");
}
