<template>
  <div class="min-vh-100 d-flex flex-column bg-beige">
    <!-- Main Content -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
      <div class="container px-4 px-md-0" style="max-width: 800px;">
        <!-- Header -->
        <div class="text-center mb-5">
          <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 2.5rem;">
            For Our Valued Customers
          </h1>
          <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.15rem;">
            Experience seamless household management with complete peace of mind.
          </p>
        </div>

        <!-- Information Blocks -->
        <div class="d-flex flex-column gap-3">
          <!-- Block 1 -->
          <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
            <Icon name="bi:person" size="24" style="color: var(--color-pink);" class="me-3" />
            <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
              Personalised provider matching and easy service management.
            </span>
          </div>

          <!-- Block 2 -->
          <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
            <Icon name="bi:check-circle" size="24" style="color: var(--color-pink);" class="me-3" />
            <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
              Confidence through verified professionals and consistent oversight.
            </span>
          </div>

          <!-- Block 3 -->
          <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
            <Icon name="bi:file-earmark-text" size="24" style="color: var(--color-pink);" class="me-3" />
            <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
              Transparent scheduling, secure payments, and clear communication.
            </span>
          </div>

          <!-- Block 4 -->
          <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
            <Icon name="bi:heart" size="24" style="color: var(--color-pink);" class="me-3" />
            <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
              Full peace of mind – from the moment of booking to completion.
            </span>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Chat Button -->
    <button class="floating-chat-btn d-flex justify-content-center align-items-center rounded-circle shadow-lg">
      <Icon name="bi:chat-dots" size="28" color="white" />
    </button>
  </div>
</template>




