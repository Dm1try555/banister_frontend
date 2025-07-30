<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- Settings Card -->
    <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
      <div class="card-body">
        <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
          Settings
        </h2>
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:user-circle" size="20" class="me-2" />
                  Profile Settings
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Update your personal information and preferences
                </p>
                <button class="btn btn-primary" style="font-family: var(--font-inter);">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:shield-check" size="20" class="me-2" />
                  Security Settings
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Manage your password and security preferences
                </p>
                <button class="btn btn-outline-primary" style="font-family: var(--font-inter);">
                  Change Password
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:bell" size="20" class="me-2" />
                  Notification Settings
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Configure your notification preferences
                </p>
                <button class="btn btn-outline-secondary" style="font-family: var(--font-inter);">
                  Configure
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:cog" size="20" class="me-2" />
                  Service Settings
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Manage your service availability and preferences
                </p>
                <button class="btn btn-outline-secondary" style="font-family: var(--font-inter);">
                  Manage Services
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h6 class="mb-3" style="font-family: var(--font-inter); font-weight: 600;">Account Settings</h6>
          <div class="row g-3">
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="emailNotifications" checked>
                <label class="form-check-label" for="emailNotifications" style="font-family: var(--font-inter);">
                  Email Notifications
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="smsNotifications">
                <label class="form-check-label" for="smsNotifications" style="font-family: var(--font-inter);">
                  SMS Notifications
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="autoAccept" checked>
                <label class="form-check-label" for="autoAccept" style="font-family: var(--font-inter);">
                  Auto-accept bookings
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="vacationMode">
                <label class="form-check-label" for="vacationMode" style="font-family: var(--font-inter);">
                  Vacation Mode
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'provider-dashboard' })
</script> 