import React from "react";
import { View, Text, Image } from "react-native";

export default function About(props) {
  const { name, img, number, reviews, rating, category } =
    props.route.params;

  
  return (
    <View>
      <RestaurantImage image={img} />
      <RestaurantName name={name} />
      <RestaurantDescription description={number} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.img }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: "600",
      marginTop: 10,
      marginHorizontal: 15,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: "400",
      fontSize: 15.5,
    }}
  >
    {props.detail}
  </Text>
);
