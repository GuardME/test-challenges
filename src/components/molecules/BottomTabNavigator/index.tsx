import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  label: string;
  focus: boolean;
};

const IconComponent: React.FC<IconProps> = ({ label, focus }) => {
  switch (label) {
    case 'Home':
      return (
        <Icon
          name={focus ? 'home' : 'home-outline'}
          size={24}
          color={focus ? '#8c7851' : '#222'}
        />
      );
    case 'Favorite':
      return (
        <Icon
          name={focus ? 'heart' : 'heart-outline'}
          size={24}
          color={focus ? '#8c7851' : '#222'}
        />
      );
    case 'Profile':
      return (
        <Icon
          name={focus ? 'account' : 'account-outline'}
          size={24}
          color={focus ? '#8c7851' : '#222'}
        />
      );
    default:
      return (
        <Icon
          name="help-circle-outline"
          size={24}
          color={focus ? '#8c7851' : '#222'}
        />
      );
  }
};

type BottomNavigatorProps = {
  state: any;
  descriptors: any;
  navigation: any;
};

const BottomNavigator: React.FC<BottomNavigatorProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <IconComponent label={label} focus={isFocused} />
            <Text style={{ color: isFocused ? '#8c7851' : '#8e8e93', fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-around',
    borderRadius: 30, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 10, 
    elevation: 4, 
    position: 'absolute',
    bottom: 13,
    left: 0,
    right: 0,
    marginHorizontal: 20,
  },
  btn: {
    alignItems: 'center',
  },
});
