import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';

import { useAuth} from "../../contexts/AuthContext";
import { Link } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn } = useAuth();

    const handLeLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            const result = await signIn(email, password);

            if (!result.success) {
                Alert.alert('Error', result.message || 'Erro ao fazer login');
            }
        } catch (error) {
            Alert.alert('Error', 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <Text style={styles.emoji}>👋</Text>
                <Text style={styles.title}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
    
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                />
    
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    editable={!loading}
                />
    
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handLeLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
    
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Não tem uma conta?</Text>
                    <Link href="/(auth)/register" asChild>
                        <TouchableOpacity disabled={loading}>
                            <Text style={styles.registerLink}> Registre-se</Text>
                        </TouchableOpacity>
                            </Link>
            </View>

            <Text styles={styles.infoText}>
                Dica: Se não tiver conta, crie uma nova!
            </Text>
        </View>
        </KeyboardAvoidingView>
    );
}
