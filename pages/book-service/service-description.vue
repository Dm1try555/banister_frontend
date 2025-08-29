<template>
  <div>
    <!-- Main Content -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5 bg-beige">
      <div class="container px-4 px-md-0" style="max-width: 1000px;">
        <!-- Header -->
        <div class="text-center mb-5">
          <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 2.5rem;">
            Professional Maid Services
          </h1>
          <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.15rem;">
            Experienced, vetted professionals for all your house cleaning needs
          </p>
        </div>

        <!-- Content Sections -->
        <div class="row g-5 justify-content-center">
          <!-- What's Included Section -->
          <div class="col-md-6 col-lg-5">
            <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
              What's Included
            </h2>
            <ul class="list-unstyled service-features">
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Thorough cleaning</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Attention to details</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Eco-friendly products</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Flexible scheduling</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Background-checked professionals</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Quality guarantee</span>
              </li>
              <li class="d-flex align-items-center mb-3">
                <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Insurance coverage</span>
              </li>
            </ul>
          </div>

          <!-- Service Details Card -->
          <div class="col-md-6 col-lg-5">
            <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
              <div class="card-body">
                <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
                  Service Details
                </h2>
                <div class="d-flex align-items-center mb-3">
                  <Icon name="bi:clock" size="24" style="color: var(--color-pink);" class="me-3" />
                  <div>
                    <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Duration</h5>
                    <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">From 2 hours depending on home size</p>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <Icon name="bi:currency-pound" size="24" style="color: var(--color-pink);" class="me-3" />
                  <div>
                    <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Pricing</h5>
                    <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">£27 per hour</p>
                  </div>
                </div>
                <div class="d-flex align-items-center mb-3">
                  <Icon name="bi:shield-check" size="24" style="color: var(--color-pink);" class="me-3" />
                  <div>
                    <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Verification</h5>
                    <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">Background checked & insured</p>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <Icon name="bi:star" size="24" style="color: var(--color-pink);" class="me-3" />
                  <div>
                    <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Quality</h5>
                    <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">100% satisfaction guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Find Your Professional Button -->
        <div class="text-center mt-5">
          <NuxtLink to="#" class="btn btn-primary-green py-3 px-5 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
            Find your professional
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
  
