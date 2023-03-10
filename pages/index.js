import Head from "next/head";
import axios from "axios";
import Image from "next/image";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose = {setClose}/>}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add setClose = {setClose}/>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true;
  }
  
  const dev = process.env.NODE_ENV !== 'production';

  const res = await axios.get(`${dev ? 'http://' : 'https://'}${ctx.req.headers.host}/api/products`);
  return {
    props:{
      pizzaList: res.data,
      admin
    },
  }
}