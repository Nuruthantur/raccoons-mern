import Item from "./Item";
import { Community, Company, Developers, Products, Support } from "./Menus";

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={Products} title="Product" />
      <Item Links={Company} title="Company" />
      <Item Links={Support} title="Support" />
      <Item Links={Developers} title="Developers" />
      <Item Links={Community} title="Community" />
    </div>
  );
};

export default ItemsContainer;
