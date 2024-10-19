import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: 'PoppinsMedium-1JPv',
    color: '#020202',
    fontStyle: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'PoppinsLight-l4Zw',
    color: '#8D92A3',
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
