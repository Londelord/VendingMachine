import { Slider, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Stores/Store.ts";
import { useEffect } from "react";
import {
  setFilteredProducts,
  setFilterRange,
  setSelectedBrand,
} from "../../Stores/Slices/FilterSlicer.ts";
import { useNavigate } from "react-router-dom";
import { BackendService } from "../../BackendService/BackendService.ts";
import { FilterWrapper } from "./FilterBarStyles.ts";

const FilterBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const brands = useSelector((state: RootState) => state.product_brands.brands);
  const products = useSelector(
    (state: RootState) => state.product_brands.products,
  );
  const selectedProducts = useSelector(
    (state: RootState) => state.product_brands.selectedProducts,
  );

  const range = useSelector((state: RootState) => state.filter.priceRange);
  const selectedBrand = useSelector(
    (state: RootState) => state.filter.selectedBrand,
  );

  const minPrice = products.length > 0 ? Math.min(...products.map(p => p.price)) : 0;
  const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 100;

  useEffect(() => {
    dispatch(setFilterRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice, dispatch]);

  useEffect(() => {
    filterProducts();
  }, [range, selectedBrand]);

  const filterProducts = (): void => {
    const filtered = products.filter(
      (p) => p.price >= range[0] && p.price <= range[1],
    );

    const brandFiltered = selectedBrand
      ? filtered.filter((p) => p.brand.id == selectedBrand.id)
      : filtered;

    dispatch(setFilteredProducts(brandFiltered.sort((a, b) => a.id - b.id)));
  };

  const onRangeChange = (value: number[]) => {
    dispatch(setFilterRange([value[0], value[1]]));
  };

  const handleBrandChange = (value: number | null) => {
    const brand = brands.find((b) => b.id === value);
    dispatch(setSelectedBrand(brand || null));
  };

  const navigateToOrder = async () => {
    await BackendService.Unlock();
    navigate("/order");
  }

  return (
    <FilterWrapper>
      <Select
        options={brands.map((b) => ({ value: b.id, label: b.name }))}
        placeholder="Выберите бренд"
        style={{ width: 200 }}
        allowClear
        onChange={handleBrandChange}
      />
      {products.length > 0 && (
        <Slider
          range
          min={minPrice}
          max={maxPrice}
          value={[range[0], range[1]]}
          onChange={onRangeChange}
          tooltip={{
            formatter: (value) => `${value} ₽`,
            placement: "bottom",
          }}
          marks={{
            [minPrice]: `${minPrice} ₽`,
            [maxPrice]: `${maxPrice} ₽`,
          }}
          style={{ width: "30%" }}
        />
      )}

      <Button
        color="green"
        variant="solid"
        disabled={selectedProducts.length === 0}
        onClick={() => { navigateToOrder() }}
      >
        Выбрано: {selectedProducts.length}
      </Button>
    </FilterWrapper>
  );
};

export default FilterBar;
