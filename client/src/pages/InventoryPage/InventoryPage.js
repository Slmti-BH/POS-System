import React, { useState } from "react";
import AddItem from "../../components/AddItem/AddItem";
import InvItems from "../../components/InvItems/InvItems";
import "./InventoryPage.scss";

function InventoryPage() {
  const [selectedTab, setSelectedTab] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("ASC");

  const assignSelectedTab = (event) => {
    event.preventDefault();
    setSelectedTab(event.target.id);
  };
  // console.log(selectedTab);

  return selectedTab === null ? (
    <div className="invt">
      <a className="invt__title-link" href="./inv">
        <h1 className="invt__title">Inventory</h1>
      </a>

      <div className="invt__container">
        <h2 className="invt__sub-title">ITEMS & INVENTORY</h2>
        <div className="invt__card-container">
          <div
            onClick={assignSelectedTab}
            id="inv_items"
            className="invt__search-card"
          >
            <h3 className="invt__card-title">Item Search </h3>
          </div>

          <div
            onClick={assignSelectedTab}
            id="add_new"
            className="invt__add-card"
          >
            <h3 className="invt__card-title"> New Item </h3>
          </div>
        </div>
      </div>
    </div>
  ) : selectedTab === "inv_items" ? (
    <InvItems />
  ) : (
    <AddItem />
  );
}

export default InventoryPage;
