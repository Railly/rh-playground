import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { motion, LayoutGroup } from "framer-motion";
import { useState } from "react";
import DockContainer, { DockElement } from "../components/Dock";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black bg-dotted-pattern">
      <Head>
        <title>RH-Labs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.main
        className="relative flex flex-col items-center justify-center flex-1 w-full gap-10 px-4 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <div className="relative flex flex-col items-center justify-center w-full">
          {/* Rotate Blurry Shadow */}
          <motion.div drag="x" dragConstraints={{ left: -100, right: 100 }}>
            <motion.div
              className="absolute flex flex-col items-center justify-center rounded-full w-[200px] h-[200px] bg-[linear-gradient(180deg,#1fcee588_50%,#3c64ee88_50%)] blur-[35px]"
              animate={{
                rotate: [0, 180, 360, 180, 0],
                scale: [1, 1.05, 1.2, 1.05, 1],
                opacity: 1,
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
              }}
            />
            <Image
              src="/svg/rh-logo.svg"
              alt="RH Labs Logo"
              width={173}
              height={198}
            />
          </motion.div>
        </div>
        <motion.h1
          className="z-10 text-5xl sm:text-6xl font-bold text-transparent bg-[linear-gradient(180deg,#1fcee5_33.33%,#3c64ee_80%)] bg-clip-text"
          // whileHover={{ scale: 1.2 }}
          // whileTap={{ scale: 1.1 }}
          // transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          RH Labs
        </motion.h1>
        <motion.p className="text-xl font-semibold text-white">
          An interactive playground for my experiments.
        </motion.p>
        <motion.p className="text-lg font-normal text-white">
          You will find any kind of project here. I only pretend to build in
          public and explore my creativity <br /> Let's be curious and learn
          together!
        </motion.p>
        <motion.button
          className="w-full max-w-sm py-3 mx-4 font-semibold text-white transition-colors border border-white rounded-md bg-blue-500/20 hover:bg-blue-500/40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore
        </motion.button>
        {/* <LayoutGroup id="dock-element">
          <DockContainer>
            <DockElement name="Home" />
            <DockElement name="About" />
            <DockElement name="Contact" />
          </DockContainer>
        </LayoutGroup> */}
      </motion.main>
    </div>
  );
};

export default Home;
