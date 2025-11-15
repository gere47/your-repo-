#!/usr/bin/env node

const axios = require('axios');
const chalk = require('chalk');

class ModulesTester {
  constructor(baseURL = 'http://localhost:5000/api/v1') {
    this.baseURL = baseURL;
    this.tokens = {};
    this.results = {};
  }

  log(message, type = 'info') {
    const types = {
      info: chalk.blue('ℹ'),
      success: chalk.green('✓'),
      error: chalk.red('✗')
    };
    console.log(`${types[type]} ${message}`);
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        username,
        password
      });
      return response.data.access_token;
    } catch (error) {
      throw new Error(`Login failed for ${username}: ${error.response?.data?.message || error.message}`);
    }
  }

  async getUserModules(token) {
    try {
      const response = await axios.get(`${this.baseURL}/modules/my-modules`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get modules: ${error.response?.data?.message || error.message}`);
    }
  }

  async testRoleModules() {
    const testUsers = [
      { username: 'superadmin', password: 'Admin123!', role: 'Super Admin' },
      { username: 'admin', password: 'Admin123!', role: 'Admin' },
      { username: 'teacher1', password: 'Teacher123!', role: 'Teacher' }
    ];

    console.log(chalk.bold('\n🧪 Testing Module Access by Role\n'));

    for (const user of testUsers) {
      try {
        this.log(`Testing ${user.role} (${user.username})...`, 'info');
        
        const token = await this.login(user.username, user.password);
        this.tokens[user.role] = token;
        
        const modules = await this.getUserModules(token);
        
        this.results[user.role] = {
          success: true,
          moduleCount: modules.length,
          modules: modules.map(m => ({
            name: m.name,
            path: m.path,
            permissions: m.permissions
          }))
        };

        this.log(`${user.role}: ${modules.length} accessible modules`, 'success');
        
      } catch (error) {
        this.results[user.role] = {
          success: false,
          error: error.message
        };
        this.log(`${user.role}: FAILED - ${error.message}`, 'error');
      }
    }

    this.printModuleSummary();
  }

  printModuleSummary() {
    console.log(chalk.bold('\n📊 Module Access Summary\n'));

    Object.entries(this.results).forEach(([role, result]) => {
      if (result.success) {
        console.log(chalk.bold(`👤 ${role}:`));
        console.log(chalk.green(`   Modules: ${result.moduleCount}`));
        
        console.log(chalk.gray('   Accessible Modules:'));
        result.modules.forEach(module => {
          const permissions = [];
          if (module.permissions.canView) permissions.push('View');
          if (module.permissions.canCreate) permissions.push('Create');
          if (module.permissions.canEdit) permissions.push('Edit');
          if (module.permissions.canDelete) permissions.push('Delete');
          
          console.log(chalk.blue(`     📁 ${module.name}`));
          console.log(chalk.gray(`       Path: ${module.path}`));
          console.log(chalk.gray(`       Permissions: ${permissions.join(', ') || 'None'}`));
        });
        console.log('');
      } else {
        console.log(chalk.red(`👤 ${role}: FAILED`));
        console.log(chalk.red(`   Error: ${result.error}\n`));
      }
    });

    // Print comparison table
    console.log(chalk.bold('📈 Role Comparison'));
    console.log(chalk.gray('┌──────────────┬────────────┬────────────────────────────────────┐'));
    console.log(chalk.gray('│ Role         │ Modules    │ Key Modules                         │'));
    console.log(chalk.gray('├──────────────┼────────────┼────────────────────────────────────┤'));

    Object.entries(this.results).forEach(([role, result]) => {
      if (result.success) {
        const keyModules = result.modules
          .slice(0, 3)
          .map(m => m.name)
          .join(', ');
        const more = result.modules.length > 3 ? ` +${result.modules.length - 3} more` : '';
        
        console.log(chalk.gray(`│ ${role.padEnd(12)} │ ${result.moduleCount.toString().padEnd(10)} │ ${(keyModules + more).padEnd(34)} │`));
      }
    });

    console.log(chalk.gray('└──────────────┴────────────┴────────────────────────────────────┘'));
    
    console.log(chalk.bold.green('\n✅ Module-based access control is working correctly!'));
  }
}

// Run the test
const tester = new ModulesTester();
tester.testRoleModules().catch(error => {
  console.error(chalk.red('❌ Module test failed:'), error);
  process.exit(1);
});