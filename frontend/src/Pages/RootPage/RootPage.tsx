import { useEffect } from "react";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import CardList from "../../Components/CardList/CardList.tsx";
import { BackendService } from "../../BackendService/BackendService.ts";
import { setBrands, setProducts } from "../../Stores/Slices/ProductSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "../../Components/FilterBar/FilterBar.tsx";
import {
  FilterBarAndHeaderDiv,
  NavigationButtonsDiv,
  StyledButton,
  StyledHeader,
  ToAdminButton,
} from "./RootPageStyles.ts";
import type { RootState } from "../../Stores/Store.ts";
import useLock from "../../Hooks/UseLock.ts";

function RootPage() {
  useLock();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedProducts = useSelector(
    (state: RootState) => state.product_brands.selectedProducts,
  );

  const navigateToOrder = async () => {
    navigate("/order");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await BackendService.GetAllProducts();
        const brandsData = await BackendService.GetAllBrands();

        dispatch(setProducts(productsData));
        dispatch(setBrands(brandsData));
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const navigateToAdmin = async () => {
    navigate("/admin");
  };

  return (
    <>
      <StyledHeader>
        <FilterBarAndHeaderDiv>
          <h1>Газированные напитки</h1>
          <FilterBar />
        </FilterBarAndHeaderDiv>
        <NavigationButtonsDiv>
          <ToAdminButton onClick={() => navigateToAdmin()}>
            Админ-страница
          </ToAdminButton>
          <StyledButton
            disabled={selectedProducts.length === 0}
            onClick={() => {
              navigateToOrder();
            }}
          >
            Выбрано: {selectedProducts.length}
          </StyledButton>
        </NavigationButtonsDiv>
      </StyledHeader>

      <Divider style={{ margin: "16px 0px 32px 0px" }} />
      <CardList />
    </>
  );
}

export default RootPage;
