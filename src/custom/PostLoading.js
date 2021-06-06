import React from "react"
import { View, ActivityIndicator, StyleSheet, Text } from "react-native"
import colors from "../../assets/data/colors"
const PostLoading = (props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={colors.primary} animating={true} />
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          textAlign: props.align,
          width: "80%",
        }}
      >
        {props.loderText}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default PostLoading
