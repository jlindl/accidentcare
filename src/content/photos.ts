// Stock photography for the inner pages. All free for commercial use with no attribution
// required (Unsplash License / Pexels License). Credits are kept in CREDITS.md anyway.
import type { StaticImageData } from "next/image";
import type { PhotoKey } from "./pages";

import recovery from "@/images/recovery.jpg";
import repairs from "@/images/repairs.jpg";
import replacement from "@/images/replacement.jpg";
import motorbike from "@/images/motorbike.jpg";
import taxi from "@/images/taxi.jpg";
import delivery from "@/images/delivery.jpg";
import passenger from "@/images/passenger.jpg";
import phone from "@/images/phone.jpg";
import scene from "@/images/scene.jpg";
import road from "@/images/road.jpg";
import consult from "@/images/consult.jpg";
import driver from "@/images/driver.jpg";
import damage from "@/images/damage.jpg";

type Photo = { src: StaticImageData; alt: string; position?: string };

export const photos: Record<PhotoKey, Photo> = {
  recovery: { src: recovery, alt: "A car secured on the bed of a flatbed recovery truck", position: "30% 70%" },
  repairs: { src: repairs, alt: "A mechanic beside a car raised on a lift in a clean workshop", position: "60% 50%" },
  replacement: { src: replacement, alt: "Car keys being handed over with a handshake beside a car", position: "50% 40%" },
  motorbike: { src: motorbike, alt: "A motorcyclist in a black helmet riding on an open road", position: "60% 50%" },
  taxi: { src: taxi, alt: "A London black cab on a quiet street of red-brick buildings", position: "50% 70%" },
  delivery: { src: delivery, alt: "A delivery rider on a red scooter moving through a city at night", position: "50% 60%" },
  passenger: { src: passenger, alt: "A child waving from a car window while their parent drives", position: "60% 50%" },
  phone: { src: phone, alt: "A woman smiling while talking on her mobile phone", position: "60% 40%" },
  scene: { src: scene, alt: "Someone taking a photo of a car with their phone", position: "50% 50%" },
  road: { src: road, alt: "Aerial view of a UK motorway running between fields and houses", position: "50% 60%" },
  consult: { src: consult, alt: "Two people going through claim paperwork together at a table", position: "40% 50%" },
  driver: { src: driver, alt: "A driver and passenger on a sunlit road, seen from the back seat", position: "50% 50%" },
  damage: { src: damage, alt: "Close-up of a dented wing and cracked bumper after a minor collision", position: "40% 50%" },
};
