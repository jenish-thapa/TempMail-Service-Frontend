import { Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

export { Routes, Route, Link, Dashboard };
