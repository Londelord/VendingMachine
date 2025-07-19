import { useEffect } from "react";
import { BackendService } from "../../BackendService/BackendService.ts";
import { Button, Divider, notification, Upload, type UploadProps } from "antd";
import AdminList from "../../Components/AdminList/AdminList.tsx";
import AdminNavbar from "../../Components/AdminNavbar/AdminNavbar.tsx";
import type { AppDispatch } from "../../Stores/Store.ts";
import { useDispatch } from "react-redux";
import { setBrands, setProducts } from "../../Stores/Slices/ProductSlice.ts";
import { useNavigate } from "react-router-dom";
import type { AddProductRequest } from "../../BackendService/Contracts.ts";
import * as XLSX from "xlsx";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { MainDiv, StyledHeader } from "./AdminPageStyles.ts";

interface ExcelProduct {
  Name: string | undefined;
  BrandId: number | undefined;
  Price: number | undefined;
  Quantity: number | undefined;
}

function AdminPage() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

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
  }, []);

  const handleExcelImport = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json<ExcelProduct>(worksheet);

      const productsToAdd: AddProductRequest[] = jsonData.map((item) => {
        if (!item.Name) {
          throw new Error("Отсутствует название продукта");
        }
        if (!item.BrandId) {
          throw new Error("Отсутствует ID бренда");
        }

        return {
          name: item.Name,
          brandId: Number(item.BrandId),
          price: Number(item.Price ?? 0),
          quantity: Number(item.Quantity ?? 0),
        };
      });

      const updatedProducts =
        await BackendService.ImportProducts(productsToAdd);
      dispatch(setProducts(updatedProducts));
      api.success({
        message: "Продукты добавлены",
        description: "Новый список продуктов успешно импортирован",
        placement: "bottomRight",
        icon: <CheckCircleOutlined style={{ color: "green" }} />,
        showProgress: true,
        pauseOnHover: true,
      });
    } catch (error) {
      console.error("Ошибка при импорте:", error);
      api.error({
        message: "Ошибка при импорте:",
        description: "Не удалось импортировать продукты",
        placement: "bottomRight",
        icon: <ClockCircleOutlined style={{ color: "red" }} />,
        showProgress: true,
        pauseOnHover: true,
      });
    }
  };

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      handleExcelImport(file);
      return false;
    },
    showUploadList: false,
    accept: ".xlsx, .xls",
  };

  return (
    <>
      {contextHolder}
      <StyledHeader>
        <h1 style={{ margin: "auto auto auto 0" }}>Admin Page</h1>
        <div style={{ margin: "auto 0", display: "flex", gap: "16px" }}>
          <Upload {...uploadProps}>
            <Button>Импорт</Button>
          </Upload>
          <Button onClick={() => navigate("/")}>Назад</Button>
        </div>
      </StyledHeader>
      <Divider />
      <MainDiv>
        <AdminList />
        <AdminNavbar />
      </MainDiv>
    </>
  );
}

export default AdminPage;
