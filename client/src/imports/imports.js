import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const EmailDetails = lazy(() => import("../pages/EmailDetails/EmailDetails"));
const Home = lazy(() => import("../pages/Home/Home"));

export { Routes, Route, Link, Dashboard, EmailDetails, Home };
