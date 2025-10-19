import { CheckDatabaseExists } from "@/backend/business-layer/general";
import Loading from "@/src/components/util/Loading";
import { router } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function Index() {


  useEffect(
    () => {
      async function checkDB() {

        const dbExists = await CheckDatabaseExists();

        router.replace(dbExists ? '/app/home' : '/setup');
      }
      checkDB();
    }
    , [])


  return <Loading />
}
