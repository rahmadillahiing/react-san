import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

const CardList = () => {
  return (
    <View>
      <Card style={styles.cardcontainer}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />

        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.cardcontainer}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />

        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
      <Card style={styles.cardcontainer}>
        <Card.Title title="Card Title" subtitle="Card Subtitle" />

        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  cardcontainer: {
    borderBottomColor: "green",
    borderBottomWidth: 1,
    borderTopColor: "green",
    borderTopWidth: 1,
  },
});
