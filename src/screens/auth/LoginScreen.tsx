
import React, { useState } from "react";
import { View, Text, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { loginStyles } from "../../styles/appStyle";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { LoginForm } from "../../types/auth"; // <-- Usamos tu interfaz profesional

export const LoginScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

 
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (key: keyof LoginForm, value: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  };

  const validate = (): boolean => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    // Validación de formato de correo básico
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(loginForm.email)) {
      setEmailError("Ingresa un correo electrónico válido");
      valid = false;
    }
    if (loginForm.password.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      valid = false;
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, loginForm.email, loginForm.password);
      // El AuthContext detectará el login y cambiará de pantalla automáticamente
    } catch (error) {
      Alert.alert("Error de Acceso", "Credenciales incorrectas o usuario no registrado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.header}>
          <Text style={loginStyles.title}>Iniciar Sesión</Text>
          <Text style={loginStyles.subtitle}>Ingresa tus credenciales</Text>
        </View>

        <View style={loginStyles.form}>
          <Input 
            label="Email" 
            value={loginForm.email} 
            onChangeText={(val) => handleInputChange("email", val)} 
            autoCapitalize="none" 
            keyboardType="email-address"
            error={emailError}
          />
          <Input 
            label="Contraseña" 
            value={loginForm.password} 
            onChangeText={(val) => handleInputChange("password", val)} 
            isPassword 
            error={passwordError}
          />
          <Button title="Entrar" onPress={handleLogin} loading={loading} style={loginStyles.button} />
        </View>

        <View style={loginStyles.footer}>
          <Text style={{ marginTop: 20, textAlign: 'center', color: '#555' }}>
            ¿No tienes cuenta?{' '}
            <Text style={loginStyles.link} onPress={() => navigation.navigate("Register")}>
              Regístrate
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};