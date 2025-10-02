import { Redirect } from 'expo-router'

export default function Index() {
    //Redireciona para login por padrão
    // O AuthContext ira gerenciar o redirecionamento correto
    return <Redirect href="/(auth)/login" />;
}