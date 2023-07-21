import { NavLink } from "react-router-dom";

import TabThread from "@components/Admin/TabThread/Index";
import TabUser from "@components/Admin/TabUser/Index";

import UseQuery from "@services/useQuery";

import style from "@pages/AdminPanel.module.scss";

function AdminPanel() {
  const query = UseQuery();

  const handleTab = () => {
    switch (query.get("tab")) {
      case "users":
        return <TabUser />;
      case "threads":
        return <TabThread />;

      default:
        return null;
    }
  };

  return (
    <section className={style.admin_panel}>
      <ul>
        <li>
          <NavLink to="/admin-panel?tab=users">Users</NavLink>
          <NavLink to="/admin-panel?tab=threads">Threads</NavLink>
        </li>
      </ul>
      <hr />
      {handleTab()}
    </section>
  );
}

export default AdminPanel;
