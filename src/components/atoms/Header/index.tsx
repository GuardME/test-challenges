import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

interface HeaderJastipProps {
  title: string;
  subtitle: string;
}

const HeaderJastip: React.FC<HeaderJastipProps> = ({ title, subtitle }) => {
  return (
      <View style={styles.container}>
          <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
    </View>
  )
}

export default HeaderJastip

const styles = StyleSheet.create({
  title : {
      fontSize: 14,
      fontFamily: 'PoppinsMedium-1JPv',
      color: '#020202',
      fontStyle: 'normal' // Changed from 'bold' to 'normal' to fix the type error
  },
  subtitle : {
          fontSize: 14,
          fontFamily: 'PoppinsLight-l4Zw',
          color: '#8D92A3'
      
  },
  container: {
      backgroundColor: 'white',
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 24,
      flexDirection: 'row',
      alignItems: 'center'
  },
})
