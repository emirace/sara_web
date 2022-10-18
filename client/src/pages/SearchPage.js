import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import styled from "styled-components";
import GallaryProduct from "../component/GallaryProduct";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { color, colorStyles } from "../constant/parameters";

const Container = styled.div`
  padding: 5vw;
`;
const SearchCont = styled.div`
  display: flex;
  margin-bottom: 30px;
  height: 40px;
  align-items: center;
  background: ${color.border};
  justify-content: center;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  background: white;
  height: 80%;
  width: 80%;
  margin-left: 4px;
  & svg {
    margin: 0 10px;
  }
`;
const Input = styled.input`
  background: none;
  height: 100%;
  border: 0;
  flex: 1;
  &:focus-visible {
    outline: none;
  }
`;

const Content = styled.div`
  background: ${color.background2};
  padding: 10px;
  height: 500px;
`;

const Filter = styled.div`
  display: flex;
  background: ${color.border};
  justify-content: space-between;
  height: 40px;
  margin-bottom: 30px;
`;

const FilterCont = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 550px) {
    display: none;
  }
`;

const categorylist = [
  { value: "Casual", label: "Casual" },
  { value: "Corperate", label: "Corperate" },
  { value: "Corporate", label: "Corporate" },
  { value: "Owambe", label: "Owambe" },
];

const pricelist = [
  { value: "1-50", label: "EUR1 to EUR50" },
  { value: "51-200", label: "EUR51 to EUR200" },
  { value: "201-1000", label: "EUR201 to EUR1000" },
];
const orderlist = [
  { value: "newest", label: "Newly Arrived" },
  { value: "lowest", label: "Price: Low to High" },
  { value: "highest", label: "Price: High to Low" },
  { value: "discount", label: "Discount" },
];

export default function SearchPage() {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const searchQuerry = sp.get("searchQuerry") || "all";
  const price = sp.get("price") || "all";
  const order = sp.get("order") || "all";

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `/api/products/search?searchQuerry=${searchQuerry}&category=${category}&price=${price}&order=${order}`
        );
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getProducts();
  }, [searchQuerry, category, price, order]);

  const getFilterUrl = (filter) => {
    console.log(filter);
    //const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.searchQuerry || searchQuerry;
    const filterPrice = filter.price || price;
    const filterOrder = filter.order || order;
    return `/search?category=${filterCategory}&searchQuerry=${filterQuery}&price=${filterPrice}&order=${filterOrder}`;
  };

  return (
    <Container>
      <SearchCont>
        <Search>
          <IoSearchOutline color="black" />
          <Input
            type="text"
            placeholder="Search anything..."
            onChange={(e) =>
              navigate(getFilterUrl({ searchQuerry: e.target.value }))
            }
          />
        </Search>
      </SearchCont>
      <Filter>
        <FilterCont>
          <div style={{ display: "flex" }}>
            <Select
              options={categorylist}
              styles={colorStyles}
              onChange={(e) => navigate(getFilterUrl({ category: e.value }))}
            />
            <Select
              options={pricelist}
              styles={colorStyles}
              onChange={(e) => navigate(getFilterUrl({ price: e.value }))}
            />
          </div>
          <div>
            <Select
              options={orderlist}
              styles={colorStyles}
              onChange={(e) => navigate(getFilterUrl({ order: e.value }))}
            />
          </div>
        </FilterCont>
      </Filter>
      <Content>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox type="error">{error}</MessageBox>
        ) : (
          <div>
            <div>0 Result</div>
            <div>
              {products.map((product) => (
                <GallaryProduct key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </Content>
    </Container>
  );
}
