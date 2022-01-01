import CatList from "../CatList/CatList";
import SearchSection from "../SearchSection/SearchSection";

const SelectionMenu = () => {
    return ( <>
        <div className="selection-menu-container">
            <SearchSection />
            <CatList />
        </div>
    </> );
}
 
export default SelectionMenu;