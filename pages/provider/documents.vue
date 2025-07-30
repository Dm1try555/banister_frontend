<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- Documents Card -->
    <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
      <div class="card-body">
        <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
          Documents
        </h2>
        
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:document-text" size="20" class="me-2" />
                  Service Documents
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Upload and manage your service-related documents
                </p>
                <button class="btn btn-primary" style="font-family: var(--font-inter);">
                  Upload Document
                </button>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h5 class="card-title" style="font-family: var(--font-inter); font-weight: 600;">
                  <Icon name="heroicons:identification" size="20" class="me-2" />
                  Identity Documents
                </h5>
                <p class="card-text text-muted" style="font-family: var(--font-inter);">
                  Manage your identification and verification documents
                </p>
                <button class="btn btn-outline-primary" style="font-family: var(--font-inter);">
                  View Documents
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h6 class="mb-3" style="font-family: var(--font-inter); font-weight: 600;">Recent Documents</h6>
          <div class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Document Name</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Type</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Upload Date</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-family: var(--font-inter);">Service Agreement.pdf</td>
                  <td style="font-family: var(--font-inter);">Contract</td>
                  <td style="font-family: var(--font-inter);">2024-01-15</td>
                  <td>
                    <span class="badge bg-success" style="font-family: var(--font-inter);">Approved</span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter);">
                      <Icon name="heroicons:eye" size="16" class="me-1" />
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
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