set nocompatible 
filetype on
filetype indent on
filetype plugin on
syntax on
set hlsearch
set laststatus=2
set statusline=%<%f\%h%m%r%=%-20.(line=%l\ \ col=%c%V\ \ totlin=%L%)\ \ \%h%m%r%=%-40(bytval=0x%B,%n%Y%)\%P
set tabstop=4
set shiftwidth=4
set textwidth=79
set noexpandtab
set number
map [18~ :tabp<CR>
map [19~ :tabn<CR>
nmap <space>' ciw'<c-r>"'<esc>
vmap <space>' c'<c-r>"'<esc>
nmap <space>( ciw(<c-r>")<esc>
vmap <space>( c(<c-r>")<esc>
nmap <space>[ ciw[<c-r>"]<esc>
vmap <space>[ c[<c-r>"]<esc>


" Settings needed for letex-suite
" Needed for win32 users only
" set shellslash
set grepprg=grep\ -nH\ $*
let g:tex_flavor='latex'

" This should allow me to open the .pdf file corresponding to the .tex file
" At output line corresponding to the current cursor position in the source
" file.
nmap .r :w<CR>:silent !/Applications/Skim.app/Contents/SharedSupport/displayline -r <C-r>=line('.')<CR> %<.pdf %<CR> &

nmap .c \ll

nmap n nzz
nmap N Nzz

nmap <space> zz

:set scrolloff=1000

" These settings let latex-suite use skim as the viewing program
let g:tex_flavor='latex'
let g:Tex_TreatMacViewerAsUNIX = 1
let g:Tex_ExecuteUNIXViewerInForeground = 1
let g:Tex_DefaultTargetFormat = 'pdf'
let g:Tex_MultipleCompileFormats='pdf, aux'
let g:Tex_ViewRule_pdf = 'open -a /Applications/Skim.app'
let Tex_FoldedSections=""
let Tex_FoldedEnvironments=""
let Tex_FoldedMisc=""
" Commands to set default viewer for other modes, I don't think I care
"let g:Tex_ViewRule_ps = 'open -a Skim'
"let g:Tex_ViewRule_dvi = 'open -a /Applications/texniscope.app'

" REQUIRED. This makes vim invoke Latex-Suite when you open a tex file.
filetype plugin on

" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
" can be called correctly.
set shellslash

" IMPORTANT: grep will sometimes skip displaying the file name if you
" search in a singe file. This will confuse Latex-Suite. Set your grep
" program to always generate a file-name.
set grepprg=grep\ -nH\ $*

" OPTIONAL: This enables automatic indentation as you type.
filetype indent on

" OPTIONAL: Starting with Vim 7, the filetype of empty .tex files defaults to
" 'plaintex' instead of 'tex', which results in vim-latex not being loaded.
" The following changes the default filetype back to 'tex':
let g:tex_flavor='latex'
let g:Tex_TreatMacViewerAsUNIX = 1
let g:Tex_ExecuteUNIXViewerInForeground = 1
let g:Tex_ViewRule_ps = 'open -aF Skim'
let g:Tex_ViewRule_pdf = 'open -aF /Applications/Skim.app'
let g:Tex_ViewRule_dvi = 'open -aF /Applications/texniscope.app'
