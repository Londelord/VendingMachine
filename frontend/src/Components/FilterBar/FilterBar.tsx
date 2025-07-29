import { Slider, Select, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { useEffect } from "react";
import {
  setAvailableRange,
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

const FilterBar = () => {
  const dispatch = useDispatch();

  const brands = useSelector((state: RootState) => state.product_brands.brands);
  const products = useSelector(
    (state: RootState) => state.product_brands.products,
  );

  const availableRange = useSelector(
    (state: RootState) => state.filter.availableRange,
  );
  const range = useSelector((state: RootState) => state.filter.priceRange);
  const selectedBrand = useSelector(
    (state: RootState) => state.filter.selectedBrand,
  );

  const shouldShowSlider = availableRange[0] !== availableRange[1];

  useEffect(() => {
    if (selectedBrand) {
      const brandProducts = products.filter(
        (p) => p.brand.id === selectedBrand.id,
      );
      if (brandProducts.length > 0) {
        const min = Math.min(...brandProducts.map((p) => p.price));
        const max = Math.max(...brandProducts.map((p) => p.price));
        dispatch(setFilterRange([min, max]));
      } else {
        dispatch(setFilterRange([0, 0]));
      }
    } else if (products.length > 0) {
      const min = Math.min(...products.map((p) => p.price));
      const max = Math.max(...products.map((p) => p.price));
      dispatch(setFilterRange([min, max]));
    }
  }, [selectedBrand, products, dispatch]);

  useEffect(() => {
    filterProducts();
  }, [range, selectedBrand]);

  const filterProducts = (): void => {
    let filtered = products;

    if (selectedBrand) {
      filtered = filtered.filter((p) => p.brand.id === selectedBrand.id);
    }

    const newMin =
      filtered.length > 0 ? Math.min(...filtered.map((p) => p.price)) : 0;
    const newMax =
      filtered.length > 0 ? Math.max(...filtered.map((p) => p.price)) : 0;

    dispatch(setAvailableRange([newMin, newMax]));

    const [currentMin, currentMax] = range;
    const adjustedMin = Math.max(newMin, currentMin);
    const adjustedMax = Math.min(newMax, currentMax);

    const priceFiltered = filtered.filter(
      (p) => p.price >= adjustedMin && p.price <= adjustedMax,
    );

    dispatch(setFilteredProducts(priceFiltered.sort((a, b) => a.id - b.id)));
  };

  const onRangeChange = (value: number[]) => {
    dispatch(setFilterRange([value[0], value[1]]));
  };

  const handleBrandChange = (value: number | null) => {
    const brand = brands.find((b) => b.id === value);
    dispatch(setSelectedBrand(brand || null));
  };

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
            <MinLabel>{availableRange[0]} руб.</MinLabel>
            <MaxLabel>{availableRange[1]} руб.</MaxLabel>
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
                min={availableRange[0]}
                max={availableRange[1]}
                value={[range[0], range[1]]}
                onChange={shouldShowSlider ? onRangeChange : undefined}
                disabled={!shouldShowSlider}
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
