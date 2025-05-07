export async function checkAuthentication() {
    const user = localStorage.getItem("user");
    const auth_token = localStorage.getItem("auth_token");

    // Return true only if both user and auth_token exist
    return !!user && !!auth_token;
}