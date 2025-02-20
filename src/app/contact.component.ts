import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  standalone: true,
  template: `
    <style>
      /* Container */
      .contact-form-container {
        max-width: 500px;
        margin: 0 auto;
        text-align: center;
        font-family: Arial, sans-serif;
      }

      /* Heading and Subtext */
      .contact-form-heading {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      .contact-form-subtext {
        font-size: 16px;
        color: #666;
        margin-bottom: 30px;
      }

      /* Form */
      .contact-form {
        text-align: left;
      }

      .contact-form-section-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }

      /* Input Fields */
      .contact-form-input {
        width: 100%;
        padding: 10px;
        margin: 8px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
      }

      .contact-form-input.full-width {
        width: 100%;
      }

      /* Row Layout */
      .contact-form-row {
        display: flex;
        gap: 10px;
      }

      .contact-form-row .contact-form-input {
        flex: 1;
      }

      /* Button */
      .contact-form-button {
        width: 100%;
        padding: 12px;
        background: #1a1a57;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        margin-top: 20px;
      }

      .contact-form-button:hover {
        background: #131347;
      }
    </style>
    <div class="contact-form-container">
      <h1 class="contact-form-heading">Request a call</h1>
      <p class="contact-form-subtext">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in
        hendrerit urna.
      </p>

      <form class="contact-form">
        <fieldset>
          <legend class="contact-form-section-title">Your details</legend>
          <div class="contact-form-row">
            <input
              type="text"
              placeholder="First name"
              class="contact-form-input"
            />
            <input
              type="text"
              placeholder="Last name"
              class="contact-form-input"
            />
          </div>
          <div class="contact-form-row">
            <input
              type="email"
              placeholder="Email"
              class="contact-form-input full-width"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend class="contact-form-section-title">
            Your business details
          </legend>
          <div class="contact-form-row">
            <input
              type="text"
              placeholder="Company name"
              class="contact-form-input full-width"
            />
          </div>
          <div class="contact-form-row">
            <input
              type="text"
              placeholder="Address line 1"
              class="contact-form-input"
            />
            <input
              type="text"
              placeholder="Address line 2"
              class="contact-form-input"
            />
          </div>
          <div class="contact-form-row">
            <input type="text" placeholder="City" class="contact-form-input" />
            <input type="text" placeholder="State" class="contact-form-input" />
            <input
              type="text"
              placeholder="ZIP code"
              class="contact-form-input"
            />
          </div>
        </fieldset>

        <button type="submit" class="contact-form-button">Next</button>
      </form>
    </div>
  `,
})
export class ContactComponent {}
