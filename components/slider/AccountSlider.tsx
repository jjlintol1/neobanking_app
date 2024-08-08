"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface AccountSliderProps {
  accounts: any[];
}

const AccountSlider = ({ accounts }: AccountSliderProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const selected = searchParams.get("selected");

  return (
    <Swiper
      effect="cards"
      grabCursor={true}
      modules={[EffectCards]}
      className="mt-5 aspect-video min-h-[150px] w-[90%] px-10 md:min-h-[200px]"
      onSwiper={(swiper) => {
        if (selected) {
          const index = accounts.findIndex((acc) => acc.id === selected);
          swiper.activeIndex = index;
        }
      }}
      onSlideChange={(swiper) => {
        const selectedAccountId = accounts[swiper.activeIndex].id;
        const url = formUrlQuery({
          params: searchParams.toString(),
          key: "selected",
          value: selectedAccountId,
        });
        router.push(url, { scroll: false });
      }}
    >
      {accounts.map((account: any) => (
        <SwiperSlide key={account.id} className="mesh-gradient rounded-[20px]">
          <article className="flex h-full flex-col justify-between bg-primary-gradient p-4">
            <div className="flex items-center justify-between">
              <p className="font-medium text-foreground-light">
                {account.institutionName}
              </p>
              <Image
                src="/assets/icons/wifi.svg"
                alt="sensor"
                width={30}
                height={30}
              />
            </div>
            <div className="flex items-end justify-between text-foreground-light">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-foreground-light">{account.name}</p>
                <p className="flex items-center text-sm">
                  <span className="text-[2em] tracking-normal text-foreground-light">
                    •••• •••• ••••
                  </span>
                  <span className="ml-2">{account.mask}</span>
                </p>
              </div>
              <Image
                src={"/assets/icons/visa.svg"}
                alt="visa"
                height={50}
                width={50}
              />
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AccountSlider;
