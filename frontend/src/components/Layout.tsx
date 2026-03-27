import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    return (
        <table style={{backgroundColor: "white"}} width='95%'>
            <tbody>
                <tr><td><Header /></td></tr>
                <tr><td height='300' valign='top'><Outlet /></td></tr>
                <tr><td><Footer /></td></tr>
            </tbody>
        </table>
    );
}