import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  disable,
  keyboardType,
  isDark,
  right,
  onPressRight,
  style,
  onEndEditing,
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  const colorLabel = {
    color: isDark ? colors.black : colors.white,
  };

  return (
    <View>
      <Text style={[styles.label, colorLabel]}>{label}</Text>
      <TextInput
        onChange={() => onEndEditing && onEndEditing()}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={[styles.input(border), colorLabel, style]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
        keyboardType={keyboardType}
      />
      {right && (
        <TouchableOpacity
          onPress={() => {
            onPressRight && onPressRight();
          }}
          style={styles.right}
          activeOpacity={onPressRight ? 0.6 : 1}>
          {right}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: {
    fontSize: 16,

    marginBottom: 6,
  },
  right: {
    position: 'absolute',
    right: 16,
    top: '50%',
  },
});
