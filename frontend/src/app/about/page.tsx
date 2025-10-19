"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../lib/auth';
import Header from '../../components/Header';
import { useI18n } from '../../lib/i18n';

export default function AboutPage() {
  const { t, lang } = useI18n();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/auth');
    }
  }, [router]);

  if (!mounted || !isAuthenticated()) {
    return null;
  }

  return (
    <>
      <Header />
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 2rem 4rem',
        fontFamily: "'Lato', sans-serif",
        backgroundColor: 'var(--bg)',
        color: 'var(--fg)',
        minHeight: 'calc(100vh - 100px)',
        transition: 'background 0.3s, color 0.3s',
      }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)',
          color: 'var(--fg)',
          borderRadius: '8px',
          padding: '2rem',
          boxShadow: 'var(--shadow)',
          transition: 'background 0.3s, color 0.3s',
        }}>
          <h1 style={{ 
            margin: '0 0 1.5rem',
            fontSize: '2rem',
            fontWeight: 600,
            color: 'var(--fg)',
            transition: 'color 0.3s',
          }}>
            {lang === 'en' ? 'About This Project' : 'Over Dit Project'}
          </h1>

          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              marginBottom: '1rem',
              color: 'var(--accent)',
              transition: 'color 0.3s',
            }}>
              {lang === 'en' ? 'Project Description' : 'Projectbeschrijving'}
            </h2>
            <p style={{ lineHeight: 1.8, marginBottom: '1rem' }}>
              {lang === 'en' 
                ? 'This website was built as a full-stack TypeScript application for managing educational modules. It features a modern React frontend with Next.js and a NestJS backend with MongoDB for data persistence.'
                : 'Deze website is gebouwd als een full-stack TypeScript applicatie voor het beheren van educatieve modules. Het heeft een moderne React frontend met Next.js en een NestJS backend met MongoDB voor gegevenspersistentie.'}
            </p>
            <p style={{ lineHeight: 1.8 }}>
              {lang === 'en'
                ? 'Key technologies: TypeScript, Next.js, NestJS, MongoDB, React, JWT authentication, and custom i18n implementation.'
                : 'Belangrijkste technologieën: TypeScript, Next.js, NestJS, MongoDB, React, JWT-authenticatie en aangepaste i18n-implementatie.'}
            </p>
          </section>

          <section>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 600, 
              marginBottom: '1.5rem',
              color: 'var(--accent)',
              transition: 'color 0.3s',
            }}>
              {lang === 'en' ? 'Requirements' : 'Requirements'}
            </h2>

            {/* Epic 1: Modules */}
            <div style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg)',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              transition: 'background 0.3s, border 0.3s',
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '1rem',
                color: 'var(--fg)',
              }}>
                Epic 1: Modules
              </h3>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Title' : 'Titel'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Description' : 'Beschrijving'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Criteria' : 'Criteria'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>US1.1</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Modules List' : 'Modules Lijst'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to be able to see a list of modules.' : 'Als gebruiker wil ik een lijst van modules kunnen zien.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There is a page where users can see a list of modules.' : 'Er is een pagina waar gebruikers een lijst van modules kunnen zien.'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>US1.2</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Filter' : 'Filteren'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to be able to filter the module list by EC and level.' : 'Als gebruiker wil ik die module lijst kunnen filteren op EC en niveau.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There are filter buttons for EC and level.' : 'Er zijn filterknoppen voor EC en niveau.'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>US1.3</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Search' : 'Zoeken'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to be able to search for modules.' : 'Als gebruiker wil ik kunnen zoeken naar modules.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There is a search bar where users can search for modules.' : 'Er is een zoekbalk waarmee gebruikers kunnen zoeken naar modules.'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>US1.4</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Details Page' : 'Detail pagina'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to go to a details page by clicking on a module, where I can edit or delete the module.' : 'Als gebruiker wil ik door op een module te klikken naar een detailpagina gaan, waar ik de module kan wijzigen of verwijderen.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There is a details page where modules can be edited and deleted.' : 'Er is een detailpagina aanwezig waar modules gewijzigd en verwijderd kunnen worden.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Epic 2: Users */}
            <div style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg)',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              transition: 'background 0.3s, border 0.3s',
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '1rem',
                color: 'var(--fg)',
              }}>
                Epic 2: Users
              </h3>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Title' : 'Titel'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Description' : 'Beschrijving'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Criteria' : 'Criteria'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>US2.1</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Register' : 'Registreren'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I can register with my first name, last name, email address, and password, so that I have my own account.' : 'Als gebruiker kan ik registreren met mijn voornaam, achternaam, e-mailadres en wachtwoord, zodat ik een eigen account heb.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'A new user can register with their name, email address, and password.' : 'Een nieuwe gebruiker kan zich registreren met hun naam, emailadres, en wachtwoord.'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>US2.2</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Login' : 'Inloggen'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a registered user, I want to be able to log in to the website.' : 'Als geregistreerde gebruiker wil ik kunnen inloggen op de website.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'A registered user can log in with their email address and password. If the combination is incorrect, the user will receive an error message.' : 'Een geregistreerde gebruiker kan inloggen met hun emailadres en wachtwoord. Als de combinatie fout is dan krijgt de gebruiker een foutmelding.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Epic 3: Accessibility */}
            <div style={{ 
              marginBottom: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--bg)',
              borderRadius: '6px',
              border: '1px solid var(--border)',
              transition: 'background 0.3s, border 0.3s',
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 600, 
                marginBottom: '1rem',
                color: 'var(--fg)',
              }}>
                Epic 3: Accessibility
              </h3>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>ID</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Title' : 'Titel'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Description' : 'Beschrijving'}</th>
                    <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>{lang === 'en' ? 'Criteria' : 'Criteria'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '0.75rem' }}>US3.1</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Dark Mode' : 'Darkmode'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to be able to set the website to dark mode.' : 'Als gebruiker wil ik de website op dark mode kunnen zetten.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There is a button that changes the website between dark and light mode.' : 'Er is een knop die de website tussen dark mode en light mode verandert.'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem' }}>US3.2</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'Multiple Languages' : 'Meerdere talen'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'As a user, I want to be able to switch the website language.' : 'Als gebruiker wil ik de taal van de website kunnen wisselen.'}</td>
                    <td style={{ padding: '0.75rem' }}>{lang === 'en' ? 'There is a button that changes the website between Dutch and English.' : 'Er is een knop die de website tussen nederlands en engels verandert.'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
