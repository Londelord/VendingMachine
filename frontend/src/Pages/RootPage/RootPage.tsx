import { useEffect } from "react";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import CardList from "../../Components/CardList/CardList.tsx";
import { BackendService } from "../../BackendService/BackendService.ts";
import { setBrands, setProducts } from "../../Stores/Slices/ProductSlice.ts";
import { useDispatch } from "react-redux";
import FilterBar from "../../Components/FilterBar/FilterBar.tsx";
import { StyledHeader, ToAdminButton } from "./RootPageStyles.ts";

function RootPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    BackendService.TryLock().then((res) => {
      if (!res) {
        navigate("/waiting");
      }
    });
  }, [navigate]);

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
    await BackendService.Unlock();
    navigate("/admin");
  };

  return (
    <>
      <StyledHeader>
        <h1>Газированные напитки</h1>
        <ToAdminButton onClick={() => navigateToAdmin()}>
          Админ-страница
        </ToAdminButton>
      </StyledHeader>
      <Divider />
      <FilterBar />
      <Divider />
      <CardList />
    </>
  );
}

export default RootPage;
