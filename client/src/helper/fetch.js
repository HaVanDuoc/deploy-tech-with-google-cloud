import React, { useEffect, useState } from "react";
import axiosInstance from "~/utils/axiosInstance";

// Fetch list user
export const FetchUserList = () => {
  const [list, setList] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/admin/users");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch list role
export const FetchRoleList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/admin/user/newUser/listRoles");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch user
export const FetchUser = (userId) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance(`/admin/user/${userId}`);

      setUser(response.data.data);
    };

    fetch();
  }, [userId]);

  return user;
};

// Fetch gender
export const FetchGender = () => {
  const [gender, setGender] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/db/getGender");

      setGender(response.data.data);
    };

    fetch();
  }, []);

  return gender;
};

// Fetch list role
export const FetchListRole = () => {
  const [role, setRole] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/db/listRole");

      setRole(response.data.data);
    };

    fetch();
  }, []);

  return role;
};

// Fetch Status Account
export const FetchStatusAccount = () => {
  const [status, setStatus] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/db/statusAccount");

      setStatus(response.data.data);
    };

    fetch();
  }, []);

  return status;
};

// Fetch list product
export const FetchProductList = () => {
  const [list, setList] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/admin/products");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch List Tables
export const FetchListTables = () => {
  const [list, setList] = React.useState({});

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance("/db");
      setList(response.data.data);
    };

    fetch();
  }, []);

  return list;
};

// Fetch List Categories
export const FetchCategorySelect = () => {
  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance(
        "/admin/product/newProduct/listCategory"
      );

      setCategory(response.data.data);
    };

    fetch();
  }, []);

  return category;
};

// Fetch List Brand
export const FetchBrand = (categoryId) => {
  const [brand, setBrand] = useState([]);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance({
        method: "post",
        url: "/admin/product/newProduct/listSelectBrand",
        data: { categoryId },
      });

      setBrand(response.data.data);
    };

    fetch();
  }, [categoryId]);

  return brand;
};

// Fetch product
export const FetchProduct = (id) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await axiosInstance(`/admin/product/${id}`);

      setData(response.data.data);
    };

    fetch();
  }, [id]);

  return data;
};
