	$(document).ready(function() {
			
			// Initialise copy buttons
			var clipboard = new Clipboard('.button-copy', {
				target: function(trigger) { return trigger.nextElementSibling; }
			});
			clipboard.on('success', function(e) {
		    e.clearSelection();
			});
			
			// Run function when a new character is typed
			$('#input').keyup(function(){
				sequences();
			});
			// Switch between DNA and RNA
			$('input[name=seq_type]').click(function(){
				$('#dsDNA_label').text('ds'+$(this).val());
				sequences();
			});
			
			// The sequences function - the meat of the page
			//   takes two inputs - the sequence to be analysed, and the sequence type (DNA/RNA)
			function sequences(input, seq_type){
				var seq_type = $('input[name=seq_type]:checked', 'form').val();
				var input = $('#input').val().toUpperCase().split('');
				var tr = {
					'DNA': { 'A':'T', 'T': 'A', 'U': 'A', 'G': 'C', 'C': 'G' },
				  'RNA': { 'A':'U', 'T': 'A', 'U': 'A', 'G': 'C', 'C': 'G' }
				}
				var c = [];
				for (var x = 0; x < input.length; x++) {
					// Complement translation
					if(['A','C','T','G','U'].indexOf(input[x]) > -1 ){
						c.push(tr[seq_type][input[x]]);
					} else {
						input[x] = '<span class="hl">'+input[x]+'</span>';
						c.push('<span class="hl">'+input[x]+'</span>');
					}
					if(seq_type == 'RNA' && input[x] == 'T'){
						input[x] = 'U';
					}
					if(seq_type == 'DNA' && input[x] == 'U'){
						input[x] = 'T';
					}
				}
				// Put the results into the page
				$('.as_input').html( input.join('')  );
				$('.complement').html( c.join('') );
				$('.rev_complement').html( input.reverse().join('') );
				$('.rev').html( c.reverse().join('') );
			}

		});