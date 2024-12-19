# clean:
# 	@echo "Cleaning..."
# 	@rm -rf db tmp
# 	@echo "## Done ##"

server: 
	@echo "Running npm live-server"
	live-server . --port=3000


