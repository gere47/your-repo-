#!/usr/bin/env node

const { execSync } = require('child_process');
const chalk = require('chalk');

class DeploymentManager {
  constructor() {
    this.steps = [];
  }

  log(message, type = 'info') {
    const types = {
      info: chalk.blue('ℹ'),
      success: chalk.green('✓'),
      error: chalk.red('✗'),
      warning: chalk.yellow('⚠')
    };
    console.log(`${types[type]} ${message}`);
  }

  async runCommand(command, description) {
    this.log(description, 'info');
    
    try {
      execSync(command, { stdio: 'inherit' });
      this.log(`${description} - SUCCESS`, 'success');
      return true;
    } catch (error) {
      this.log(`${description} - FAILED`, 'error');
      throw error;
    }
  }

  async deployToProduction() {
    console.log(chalk.bold('\n🚀 ERP School Management System - Production Deployment\n'));

    try {
      // Pre-deployment checks
      await this.runCommand(
        'npm run test:api',
        'Running API tests'
      );

      await this.runCommand(
        'npm run db:generate',
        'Generating Prisma client'
      );

      // Build application
      await this.runCommand(
        'npm run build',
        'Building application'
      );

      // Database migrations
      await this.runCommand(
        'npx prisma migrate deploy',
        'Running database migrations'
      );

      // Seed database (if needed)
      await this.runCommand(
        'npm run db:seed',
        'Seeding database with initial data'
      );

      // Final verification
      await this.runCommand(
        'node scripts/health-check.js',
        'Verifying application health'
      );

      console.log(chalk.bold.green('\n🎉 Deployment completed successfully!'));
      console.log(chalk.gray('\n📋 Next steps:'));
      console.log(chalk.gray('   1. Verify API endpoints in production'));
      console.log(chalk.gray('   2. Test authentication flow'));
      console.log(chalk.gray('   3. Check module permissions for each role'));
      console.log(chalk.gray('   4. Monitor application logs'));

    } catch (error) {
      console.log(chalk.bold.red('\n❌ Deployment failed!'));
      console.log(chalk.red('Please check the errors above and try again.'));
      process.exit(1);
    }
  }
}

// Run deployment
const deployer = new DeploymentManager();

if (require.main === module) {
  deployer.deployToProduction().catch(error => {
    console.error(chalk.red('Deployment script failed:'), error);
    process.exit(1);
  });
}

module.exports = DeploymentManager;