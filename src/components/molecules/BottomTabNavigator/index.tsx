import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  label: string;
  focus: boolean;
};

const IconComponent: React.FC<IconProps> = ({label, focus}) => {
  switch (label) {
    case 'Home':
      return (
        <Icon
          name={focus ? 'home' : 'home-outline'}
          size={24}
          color={focus ? 'green' : '#222'}
        />
      );
    case 'Schedule':
      return (
        <Icon
          name={focus ? 'calendar' : 'calendar-outline'}
          size={24}
          color={focus ? 'green' : '#222'}
        />
      );
    case 'Profile':
      return (
        <Icon
          name={focus ? 'account' : 'account-outline'}
          size={24}
          color={focus ? 'green' : '#222'}
        />
      );
    case 'Friends':
      return (
        <Icon
          name={focus ? 'account-group' : 'account-group-outline'}
          size={24}
          color={focus ? 'green' : '#222'}
        />
      );
    default:
      return (
        <Icon
          name="help-circle-outline"
          size={24}
          color={focus ? 'green' : '#222'}
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
        const {options} = descriptors[route.key];
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
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <IconComponent label={label} focus={isFocused} />
            <Text style={{color: isFocused ? 'green' : '#222'}}>{label}</Text>
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
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  btn: {
    alignItems: 'center',

  },
});
