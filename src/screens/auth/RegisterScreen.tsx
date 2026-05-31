import React, { useState } from "react";
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { loginStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { RegisterForm } from "../../types/auth"; 
import { isValidEmail, isValidPassword } from "../../utils/validators";

export const RegisterScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (key: keyof RegisterForm, value: string) => {
    setRegisterForm({ ...registerForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!isValidEmail(registerForm.email)) {
      setEmailError("Ingresa un email válido");
      valid = false;
    }
    if (!isValidPassword(registerForm.password)) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      valid = false;
    }
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, registerForm.email, registerForm.password);
      // Al registro
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert("Error", "Este correo ya está registrado.");
      } else {
        Alert.alert("Error", "Ocurrió un problema al registrar el usuario.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>Crear Cuenta</Text>
          <Text style={loginStyles.subtitle}>Regístrate para comenzar</Text>
        </View>

        <View style={loginStyles.form}>
          <Input 
            label="Correo electrónico" 
            value={registerForm.email} 
            onChangeText={(val) => handleInputChange("email", val)} 
            error={emailError} 
            autoCapitalize="none" 
            keyboardType="email-address" 
          />
          <Input 
            label="Contraseña" 
            value={registerForm.password} 
            onChangeText={(val) => handleInputChange("password", val)} 
            error={passwordError} 
            isPassword 
          />
          <Input 
            label="Confirmar Contraseña" 
            value={registerForm.confirmPassword} 
            onChangeText={(val) => handleInputChange("confirmPassword", val)} 
            isPassword 
          />
          <Button title="Registrarse" onPress={handleRegister} loading={loading} style={loginStyles.button} />
        </View>

        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿Ya tienes cuenta? </Text>
          <Text style={loginStyles.link} onPress={() => navigation.navigate("Login")}>Inicia sesión</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};