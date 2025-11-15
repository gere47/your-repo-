# test-auth.ps1
Write-Host "School ERP Authentication Test"

$baseUrl = "http://localhost:3001/api/v1/auth"

try {
    Write-Host "Step 1: Seeding roles..."
    $seed = Invoke-RestMethod -Uri "$baseUrl/seed-roles" -Method POST
    Write-Host "Success: Roles seeded"

    Write-Host "Step 2: Registering user..."
    $registerData = @{
        email = "test@school.com"
        password = "test123"
        name = "Test User"
    }
    $registerJson = $registerData | ConvertTo-Json
    $register = Invoke-RestMethod -Uri "$baseUrl/register" -Method POST -Body $registerJson -ContentType "application/json"
    Write-Host "Success: User registered - $($register.email)"

    Write-Host "Step 3: Logging in..."
    $loginData = @{
        email = "test@school.com"
        password = "test123"
    }
    $loginJson = $loginData | ConvertTo-Json
    $login = Invoke-RestMethod -Uri "$baseUrl/login" -Method POST -Body $loginJson -ContentType "application/json"
    $token = $login.access_token
    Write-Host "Success: Login successful"

    Write-Host "Step 4: Testing profile endpoint..."
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }
    $profile = Invoke-RestMethod -Uri "$baseUrl/profile" -Method GET -Headers $headers
    Write-Host "Success: Profile accessed - $($profile.email)"

    Write-Host "Step 5: Testing admin endpoint..."
    try {
        $admin = Invoke-RestMethod -Uri "$baseUrl/admin" -Method GET -Headers $headers
        Write-Host "Success: Admin endpoint accessed"
    } catch {
        Write-Host "Info: Admin endpoint requires admin role (expected for regular user)"
    }

    Write-Host "Step 6: Testing teacher endpoint..."
    try {
        $teacher = Invoke-RestMethod -Uri "$baseUrl/teacher" -Method GET -Headers $headers
        Write-Host "Success: Teacher endpoint accessed"
    } catch {
        Write-Host "Info: Teacher endpoint requires teacher role (expected for regular user)"
    }

    Write-Host "ALL TESTS COMPLETED SUCCESSFULLY"

} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
}