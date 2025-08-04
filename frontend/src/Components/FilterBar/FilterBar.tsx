import { Slider, Select, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { useEffect, useState } from "react";
import {
  setFilteredProducts,
  setFilterRange,
  setSelectedBrand,
} from "../../Stores/Slices/FilterSlicer.ts";
import {
  FilterBarCol,
  FilterWrapper,
  MaxLabel,
  MinLabel,
  SliderWrapper,
} from "./FilterBarStyles.ts";
import { BackendService } from "../../BackendService/BackendService.ts";
import type { Product } from "../../types.ts";
import type { GetAllProductsRequest } from "../../BackendService/Contracts.ts";

const FilterBar = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state: RootState) => state.product_brands.brands);
  const products = useSelector(
    (state: RootState) => state.product_brands.products,
  );
  const range = useSelector((state: RootState) => state.filter.priceRange);
  const selectedBrand = useSelector(
    (state: RootState) => state.filter.selectedBrand,
  );

  const [localAvailableRange, setLocalAvailableRange] = useState<
    [number, number]
  >([0, 0]);
  const [localProducts, setLocalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilteredByBrand = async (brandName: string | null) => {
    setIsLoading(true);
    try {
      const request: GetAllProductsRequest = {
        brandName: brandName,
        startPrice: null,
        endPrice: null,
      };

      const brandFilteredProducts =
        await BackendService.GetAllProducts(request);

      setLocalProducts(brandFilteredProducts);
      dispatch(setFilteredProducts(brandFilteredProducts));

      if (brandFilteredProducts.length > 0) {
        const prices = brandFilteredProducts.map((p) => p.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);

        setLocalAvailableRange([min, max]);
        dispatch(setFilterRange([min, max]));
      } else {
        setLocalAvailableRange([0, 0]);
        dispatch(setFilterRange([0, 0]));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredByRange = async (
    brandName: string | null,
    range: [number, number],
  ) => {
    setIsLoading(true);

    try {
      const filtered = await BackendService.GetAllProducts({
        brandName,
        startPrice: range[0],
        endPrice: range[1],
      });

      dispatch(setFilteredProducts(filtered));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const brandName = selectedBrand?.name || null;
    fetchFilteredByBrand(brandName);
  }, [selectedBrand]);

  useEffect(() => {
    fetchFilteredByRange(selectedBrand?.name || null, range);
  }, [range]);

  const onRangeChange = (value: number[]) => {
    dispatch(setFilterRange([value[0], value[1]]));
  };

  const handleBrandChange = (value: number | null) => {
    const brand = brands.find((b) => b.id === value) || null;
    dispatch(setSelectedBrand(brand));
  };

  const shouldShowSlider =
    localProducts.length > 0 &&
    localAvailableRange[0] !== localAvailableRange[1];

  return (
    <FilterWrapper>
      <FilterBarCol>
        <label>Выберите бренд</label>
        <Select
          options={brands.map((b) => ({ value: b.id, label: b.name }))}
          placeholder="Выберите бренд"
          style={{ width: 300 }}
          allowClear
          onChange={handleBrandChange}
        />
      </FilterBarCol>
      {products.length > 0 && (
        <FilterBarCol style={{ width: "100%" }}>
          <label>Стоимость</label>
          <SliderWrapper>
            <MinLabel>{localAvailableRange[0]} руб.</MinLabel>
            <MaxLabel>{localAvailableRange[1]} руб.</MaxLabel>
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: "#c3c3c3",
                    handleActiveColor: "#d8d8d8",
                  },
                },
              }}
            >
              <Slider
                range
                min={localAvailableRange[0]}
                max={localAvailableRange[1]}
                value={[range[0], range[1]]}
                onChange={shouldShowSlider ? onRangeChange : undefined}
                disabled={!shouldShowSlider || isLoading}
                tooltip={{
                  formatter: (value) => `${value} руб.`,
                  placement: "top",
                }}
                styles={{
                  track: {
                    background: "#989898",
                  },
                }}
                style={{ width: "100%" }}
              />
            </ConfigProvider>
          </SliderWrapper>
        </FilterBarCol>
      )}
    </FilterWrapper>
  );
};
export default FilterBar;
