import { useEffect, useMemo } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export function Loader() {
  // Usamos useMemo para criar o valor animado de forma segura para a renderização
  const spinValue = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={[styles.loader, { transform: [{ rotate: spin }] }]}>
      <View style={styles.loaderBefore} />
      <View style={styles.loaderAfter} />
    </Animated.View>
  );
}

export const styles = StyleSheet.create({
  loader: {
    width: 100,
    height: 100,
    borderWidth: 4,
    borderColor: "transparent", // #0000 equivale a transparente
    borderRadius: 50, // Metade da largura para manter o círculo perfeito
    borderRightColor: "#0b1816",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBefore: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 2,
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 50,
    borderRightColor: "#1e685d", // Ajuste conforme a cor desejada para o anel interno
  },
  loaderAfter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 8,
    borderWidth: 4,
    borderColor: "transparent",
    borderRadius: 50,
    borderRightColor: "#227266",
  },
});
