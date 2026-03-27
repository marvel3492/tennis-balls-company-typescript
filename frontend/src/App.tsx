import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./views/catalog/Cart"
import Catalog from './views/catalog/Catalog';
import Checkout from './views/catalog/Checkout';
import CustomerAddRecordPage from "./views/customer/CustomerAddRecordPage";
import CustomerAllRecordsPage from "./views/customer/CustomerAllRecordsPage";
import CustomerEditRecordPage from './views/customer/CustomerEditRecordPage';
import CustomerOneRecordPage from './views/customer/CustomerOneRecordPage';
import ImageAddRecordPage from "./views/image/ImageAddRecordPage";
import ImageAllRecordsPage from "./views/image/ImageAllRecordsPage";
import ImageEditRecordPage from './views/image/ImageEditRecordPage';
import ImageOneRecordPage from './views/image/ImageOneRecordPage';
import OrderDetailAddRecordPage from "./views/orderdetail/OrderDetailAddRecordPage";
import OrderDetailAllRecordsPage from "./views/orderdetail/OrderDetailAllRecordsPage";
import OrderDetailEditRecordPage from './views/orderdetail/OrderDetailEditRecordPage';
import OrderDetailOneRecordPage from './views/orderdetail/OrderDetailOneRecordPage';
import ProductAddRecordPage from "./views/product/ProductAddRecordPage";
import ProductAllRecordsPage from "./views/product/ProductAllRecordsPage";
import ProductEditRecordPage from "./views/product/ProductEditRecordPage";
import ProductOneRecordPage from './views/product/ProductOneRecordPage';
import PromotionAddRecordPage from "./views/promotion/PromotionAddRecordPage";
import PromotionAllRecordsPage from "./views/promotion/PromotionAllRecordsPage";
import PromotionEditRecordPage from "./views/promotion/PromotionEditRecordPage";
import PromotionOneRecordPage from './views/promotion/PromotionOneRecordPage';
import SaleOrderAddRecordPage from "./views/saleorder/SaleOrderAddRecordPage";
import SaleOrderAllRecordsPage from "./views/saleorder/SaleOrderAllRecordsPage";
import SaleOrderEditRecordPage from "./views/saleorder/SaleOrderEditRecordPage";
import SaleOrderOneRecordPage from './views/saleorder/SaleOrderOneRecordPage';
import ReportMenu from './views/report/ReportMenu';
import CustomerList from './views/report/CustomerList';
import ProductList from './views/report/ProductList';
import SaleList from './views/report/SaleList';
import About from "./views/About";
import Contact from "./views/Contact";
import ErrorPage from './views/ErrorPage';
import Help from "./views/Help";
import Index from "./views/Index";
import Layout from "./components/Layout";
import Privacy from "./views/Privacy";
import Search from "./views/Search"
import Login from './views/customer/Login';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/catalog/cart" element={<Cart />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/customer/login" element={
                        <ProtectedRoute permissions={0b001}>
                            <Login />
                        </ProtectedRoute>
                    } />
                    <Route path="/customer/register" element={
                        <ProtectedRoute permissions={0b001}>
                            <CustomerAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/customer" element={
                        <ProtectedRoute permissions={0b100}>
                            <CustomerAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/customer/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <CustomerAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/customer/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <CustomerOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/customer/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <CustomerEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/image" element={
                        <ProtectedRoute permissions={0b100}>
                            <ImageAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/image/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <ImageAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/image/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <ImageOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/image/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <ImageEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/orderdetail" element={
                        <ProtectedRoute permissions={0b100}>
                            <OrderDetailAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/orderdetail/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <OrderDetailAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/orderdetail/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <OrderDetailOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/orderdetail/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <OrderDetailEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/product" element={
                        <ProtectedRoute permissions={0b100}>
                            <ProductAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/product/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <ProductAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/product/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <ProductEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/product/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <ProductOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/promotion" element={
                        <ProtectedRoute permissions={0b100}>
                            <PromotionAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/promotion/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <PromotionAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/promotion/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <PromotionEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/promotion/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <PromotionOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/saleorder" element={
                        <ProtectedRoute permissions={0b100}>
                            <SaleOrderAllRecordsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/saleorder/addrecord" element={
                        <ProtectedRoute permissions={0b100}>
                            <SaleOrderAddRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/saleorder/:id/edit" element={
                        <ProtectedRoute permissions={0b100}>
                            <SaleOrderEditRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/saleorder/:id/show" element={
                        <ProtectedRoute permissions={0b100}>
                            <SaleOrderOneRecordPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/report" element={
                        <ProtectedRoute permissions={0b100}>
                            <ReportMenu />
                        </ProtectedRoute>
                    } />
                    <Route path="/report/customer" element={
                        <ProtectedRoute permissions={0b100}>
                            <CustomerList />
                        </ProtectedRoute>
                    } />
                    <Route path="/report/product" element={
                        <ProtectedRoute permissions={0b100}>
                            <ProductList />
                        </ProtectedRoute>
                    } />
                    <Route path="/report/sale" element={
                        <ProtectedRoute permissions={0b100}>
                            <SaleList />
                        </ProtectedRoute>
                    } />
                    <Route path="/catalog/checkout" element={
                        <ProtectedRoute permissions={0b110}>
                            <Checkout />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<ErrorPage error={Error("Not Found")} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}