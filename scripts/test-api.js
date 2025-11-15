#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');

class APITester {
  constructor(baseURL = 'http://localhost:5000/api/v1') {
    this.baseURL = baseURL;
    this.token = '';
    this.user = null;
    this.testResults = [];
  }

  log(message, type = 'info') {
    const types = {
      info: chalk.blue('ℹ'),
      success: chalk.green('✓'),
      error: chalk.red('✗'),
      warning: chalk.yellow('⚠'),
      start: chalk.cyan('🚀')
    };
    console.log(`${types[type]} ${message}`);
  }

  async makeRequest(method, endpoint, data = null, auth = false) {
    const startTime = Date.now();
    try {
      const config = {
        method,
        url: `${this.baseURL}${endpoint}`,
        headers: {
          'User-Agent': 'ERP-API-Tester/1.0.0'
        },
        timeout: 10000
      };

      if (auth && this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }

      if (data) {
        config.headers['Content-Type'] = 'application/json';
        config.data = data;
      }

      const response = await axios(config);
      const responseTime = Date.now() - startTime;

      return {
        success: true,
        data: response.data,
        status: response.status,
        responseTime
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        error: error.response?.data || error.message,
        status: error.response?.status,
        responseTime
      };
    }
  }

  async runTest(name, testFn) {
    this.log(`Running: ${name}`, 'start');
    
    try {
      const result = await testFn();
      this.testResults.push({
        name,
        success: true,
        duration: result.responseTime
      });
      this.log(`${name}: SUCCESS (${result.responseTime}ms)`, 'success');
      return result;
    } catch (error) {
      this.testResults.push({
        name,
        success: false,
        error: error.message
      });
      this.log(`${name}: FAILED - ${error.message}`, 'error');
      throw error;
    }
  }

  async testHealthCheck() {
    const result = await this.makeRequest('GET', '/auth/health');
    if (!result.success) throw new Error('Health check failed');
    return result;
  }

  async testUserRegistration() {
    const timestamp = Date.now();
    const userData = {
      username: `testuser_${timestamp}`,
      email: `test${timestamp}@school.edu`,
      password: 'Test123!',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
      roleId: 3 // Teacher role
    };

    const result = await this.makeRequest('POST', '/auth/register', userData);
    if (!result.success) throw new Error('User registration failed');
    return result;
  }

  async testUserLogin() {
    const result = await this.makeRequest('POST', '/auth/login', {
      username: 'superadmin',
      password: 'Admin123!'
    });

    if (!result.success) throw new Error('Login failed');
    
    this.token = result.data.access_token;
    this.user = result.data.user;
    
    return result;
  }

  async testGetProfile() {
    const result = await this.makeRequest('GET', '/auth/profile', null, true);
    if (!result.success) throw new Error('Get profile failed');
    return result;
  }

  async testGetUsers() {
    const result = await this.makeRequest('GET', '/users?page=1&limit=5', null, true);
    if (!result.success) throw new Error('Get users failed');
    return result;
  }

  async testGetRoles() {
    const result = await this.makeRequest('GET', '/users/roles', null, true);
    if (!result.success) throw new Error('Get roles failed');
    return result;
  }

  async testGetModules() {
    const result = await this.makeRequest('GET', '/modules/my-modules', null, true);
    if (!result.success) throw new Error('Get modules failed');
    return result;
  }

  async testUpdateProfile() {
    const result = await this.makeRequest('PUT', '/auth/profile', {
      firstName: 'API',
      lastName: 'Tester'
    }, true);
    if (!result.success) throw new Error('Update profile failed');
    return result;
  }

  async testChangePassword() {
    const result = await this.makeRequest('PUT', '/auth/change-password', {
      currentPassword: 'Admin123!',
      newPassword: 'Admin123!'
    }, true);
    // Note: We're setting the same password to avoid locking out the test account
    if (!result.success && result.status !== 401) {
      throw new Error('Change password failed');
    }
    return result;
  }

  async testGetSessions() {
    const result = await this.makeRequest('GET', '/auth/sessions', null, true);
    if (!result.success) throw new Error('Get sessions failed');
    return result;
  }

  async testLogout() {
    const result = await this.makeRequest('POST', '/auth/logout', {}, true);
    if (!result.success) throw new Error('Logout failed');
    return result;
  }

  async runAllTests() {
    console.log(chalk.bold('\n🎯 ERP School Management System - API Test Suite\n'));
    console.log(chalk.gray(`Base URL: ${this.baseURL}\n`));

    try {
      // Public endpoints
      await this.runTest('Health Check', () => this.testHealthCheck());
      await this.runTest('User Registration', () => this.testUserRegistration());
      await this.runTest('User Login', () => this.testUserLogin());

      // Protected endpoints
      await this.runTest('Get User Profile', () => this.testGetProfile());
      await this.runTest('Get Users List', () => this.testGetUsers());
      await this.runTest('Get System Roles', () => this.testGetRoles());
      await this.runTest('Get User Modules', () => this.testGetModules());
      await this.runTest('Update User Profile', () => this.testUpdateProfile());
      await this.runTest('Get Active Sessions', () => this.testGetSessions());
      
      // Skip password change test to avoid locking account
      this.log('Change Password: SKIPPED (to avoid account lock)', 'warning');

      await this.runTest('User Logout', () => this.testLogout());

      // Summary
      this.printSummary();

    } catch (error) {
      this.log(`Test suite failed: ${error.message}`, 'error');
      this.printSummary();
      process.exit(1);
    }
  }

  printSummary() {
    console.log(chalk.bold('\n📊 Test Summary\n'));
    
    const passed = this.testResults.filter(r => r.success).length;
    const failed = this.testResults.filter(r => !r.success).length;
    const total = this.testResults.length;

    console.log(chalk.green(`Passed: ${passed}/${total}`));
    if (failed > 0) {
      console.log(chalk.red(`Failed: ${failed}/${total}`));
    }

    console.log(chalk.bold('\n📋 Detailed Results:'));
    this.testResults.forEach(result => {
      const icon = result.success ? chalk.green('✓') : chalk.red('✗');
      const duration = result.duration ? chalk.gray(`(${result.duration}ms)`) : '';
      console.log(`  ${icon} ${result.name} ${duration}`);
    });

    if (failed === 0) {
      console.log(chalk.bold.green('\n🎉 All tests passed! The API is working correctly.'));
    } else {
      console.log(chalk.bold.red('\n❌ Some tests failed. Please check the API configuration.'));
      process.exit(1);
    }
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const baseURL = args[0] || 'http://localhost:5000/api/v1';

const tester = new APITester(baseURL);
tester.runAllTests().catch(error => {
  console.error(chalk.red('❌ Test suite execution failed:'), error);
  process.exit(1);
});